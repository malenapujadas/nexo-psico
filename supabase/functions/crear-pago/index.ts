import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Solo confiamos en quién es el producto: el precio y el título los buscamos
    // siempre en la base de datos, nunca en lo que mande el cliente.
    const { usuario_id, producto_id } = await req.json()

    if (!usuario_id || !producto_id) {
      return new Response(JSON.stringify({ error: 'Faltan datos obligatorios.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { data: producto, error: productoError } = await supabase
      .from('productos')
      .select('title, price, activo')
      .eq('id', producto_id)
      .single()

    if (productoError || !producto) {
      return new Response(JSON.stringify({ error: 'El producto no existe.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 404,
      })
    }

    if (producto.activo === false) {
      return new Response(JSON.stringify({ error: 'Este producto ya no está disponible.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    const MP_ACCESS_TOKEN = Deno.env.get('MP_ACCESS_TOKEN')

    const bodyMercadoPago = {
      items: [
        {
          title: producto.title,
          description: 'Cuadernillo Digital - Nexo Psico',
          quantity: 1,
          currency_id: 'ARS',
          unit_price: Number(producto.price),
        },
      ],
      back_urls: {
        success: "https://www.nexopsico.com.ar/#/perfil",
        failure: "https://www.nexopsico.com.ar/#/",
        pending: "https://www.nexopsico.com.ar/#/"
      },
      auto_return: "approved",
      // 2. EL SECRETO PARA EL WEBHOOK: La información invisible de la factura
      metadata: {
        usuario_id: usuario_id,
        producto_id: producto_id
      }
    }

    const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyMercadoPago),
    })

    const mpData = await mpResponse.json()

    if (!mpResponse.ok || !mpData.init_point) {
      console.error('Mercado Pago rechazó la preferencia:', mpData)
      return new Response(
        JSON.stringify({ error: mpData.message || 'Mercado Pago no devolvió un link de pago.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    return new Response(
      JSON.stringify({ id: mpData.id, init_point: mpData.init_point }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})