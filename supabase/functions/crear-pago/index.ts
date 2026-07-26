import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 1. AHORA RECIBIMOS 4 DATOS DESDE REACT (Antes eran solo 2)
    const { titulo, precio, usuario_id, producto_id } = await req.json()

    const MP_ACCESS_TOKEN = Deno.env.get('MP_ACCESS_TOKEN')

    const bodyMercadoPago = {
      items: [
        {
          title: titulo,
          description: 'Cuadernillo Digital - Nexo Psico',
          quantity: 1,
          currency_id: 'ARS',
          unit_price: Number(precio),
        },
      ],
      back_urls: {
        success: "https://nexopsico.vercel.app/perfil", 
        failure: "https://nexopsico.vercel.app/",
        pending: "https://nexopsico.vercel.app/"
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