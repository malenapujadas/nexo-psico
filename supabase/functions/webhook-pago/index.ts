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
            email_comprador: email_comprador
          }
        ])

      if (error) throw error
    }

    return new Response('OK', { status: 200 })

  } catch (error) {
    console.error('Error en el Webhook:', error.message)
    return new Response(JSON.stringify({ error: error.message }), { status: 400 })
  }
})