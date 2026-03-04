import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface BookingConfirmationRequest {
  bookingId: string;
  email: string;
  name: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { bookingId, email, name }: BookingConfirmationRequest = await req.json();

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .maybeSingle();

    if (bookingError || !booking) {
      throw new Error('Booking not found');
    }

    const emailBody = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #1C2B3A;
              color: white;
              padding: 20px;
              text-align: center;
            }
            .content {
              padding: 30px;
              background-color: #f9f9f9;
            }
            .booking-info {
              background-color: white;
              padding: 20px;
              margin: 20px 0;
              border-left: 4px solid #1C2B3A;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #666;
              font-size: 12px;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #1C2B3A;
              color: white;
              text-decoration: none;
              border-radius: 4px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>YANORA</h1>
              <p>预约确认通知</p>
            </div>
            <div class="content">
              <h2>您好，${name}！</h2>
              <p>感谢您选择 YANORA。我们已收到您的预约和付款。</p>

              <div class="booking-info">
                <h3>预约详情</h3>
                <p><strong>预约编号：</strong>${bookingId.substring(0, 8).toUpperCase()}</p>
                <p><strong>服务类型：</strong>${booking.service_type}</p>
                <p><strong>预约日期：</strong>${booking.preferred_date || '待确认'}</p>
                <p><strong>支付金额：</strong>¥${booking.total_amount}</p>
                <p><strong>支付方式：</strong>${booking.payment_method}</p>
              </div>

              <h3>下一步</h3>
              <ul>
                <li>我们的团队将在24小时内与您联系确认具体时间</li>
                <li>请保持手机畅通，以便我们联系您</li>
                <li>如有任何问题，请随时通过邮箱或电话联系我们</li>
              </ul>

              <p>期待为您服务！</p>
            </div>
            <div class="footer">
              <p>YANORA 医疗美容中心</p>
              <p>此邮件为系统自动发送，请勿直接回复</p>
            </div>
          </div>
        </body>
      </html>
    `;

    console.log(`Email would be sent to ${email}:`);
    console.log(`Subject: YANORA - 预约确认 (${bookingId.substring(0, 8).toUpperCase()})`);
    console.log(`Body length: ${emailBody.length} characters`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email notification logged successfully',
        email: email,
        bookingId: bookingId,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error in send-booking-confirmation:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
