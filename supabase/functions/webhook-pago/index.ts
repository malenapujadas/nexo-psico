import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const url = new URL(req.url)
    const type = url.searchParams.get('type') || url.searchParams.get('topic')
    const dataId = url.searchParams.get('data.id') || url.searchParams.get('id')

    let body: any = {}
    try { body = await req.json() } catch (e) { /* Si no hay body, no hacemos nada */ }
    
    const action = body?.action || type
    const id_pago = body?.data?.id || dataId

    if (action !== 'payment.created' && type !== 'payment') {
      return new Response('Notificación ignorada', { status: 200 })
    }

    const MP_ACCESS_TOKEN = Deno.env.get('MP_ACCESS_TOKEN')
    const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${id_pago}`, {
      headers: { 'Authorization': `Bearer ${MP_ACCESS_TOKEN}` }
    })
    
    const pagoInfo = await mpResponse.json()

    if (pagoInfo.status === 'approved') {
      const usuario_id = pagoInfo.metadata.usuario_id
      const producto_id = pagoInfo.metadata.producto_id

      const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      const supabase = createClient(supabaseUrl, supabaseKey)

      // Buscamos el email de la compradora para poder avisarle por afuera (ej. entrega manual de cursos)
      const { data: usuarioData } = await supabase.auth.admin.getUserById(usuario_id)
      const email_comprador = usuarioData?.user?.email ?? null

      // 5. ¡Anotamos la compra con LOS NOMBRES EXACTOS DE TUS COLUMNAS!
      const { error } = await supabase
        .from('compras')
        .insert([
          {
            cliente_id: usuario_id,           // Actualizado
            producto_id: producto_id,         // Se mantiene igual
            mercadopago_id: id_pago.toString(), // Actualizado
            estado_pago: 'completado',        // Actualizado
            email_comprador: email_comprador,
            monto: pagoInfo.transaction_amount // El monto real pagado, no el precio actual del producto
          }
        ])

      if (error && error.code === '23505') {
        // Ya habíamos procesado este pago antes (ej. reintento de notificación de MP) — no hacemos nada más.
        return new Response('Pago ya procesado', { status: 200 })
      }
      if (error) throw error

      // Aviso interno de nueva venta (no debe frenar el webhook si falla)
      try {
        const { data: producto } = await supabase
          .from('productos')
          .select('title, tipo')
          .eq('id', producto_id)
          .single()

        const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'NexoPsico <onboarding@resend.dev>',
            to: 'nexopsicored@gmail.com',
            subject: `Nueva venta: ${producto?.title ?? 'Producto'}`,
            html: `
              <h2>¡Nueva venta confirmada!</h2>
              <p><strong>Producto:</strong> ${producto?.title ?? '—'}</p>
              <p><strong>Tipo:</strong> ${producto?.tipo === 'curso' ? 'Curso' : 'Cuadernillo'}</p>
              <p><strong>Compradora:</strong> ${email_comprador ?? '—'}</p>
              <p><strong>Monto pagado:</strong> $${Number(pagoInfo.transaction_amount).toLocaleString('es-AR')}</p>
              <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-AR')}</p>
            `,
          }),
        })
      } catch (emailError) {
        console.error('Error al enviar el aviso de venta por email:', emailError.message)
      }
    }

    return new Response('OK', { status: 200 })

  } catch (error) {
    console.error('Error en el Webhook:', error.message)
    return new Response(JSON.stringify({ error: error.message }), { status: 400 })
  }
})