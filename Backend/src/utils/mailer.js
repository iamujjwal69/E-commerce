const nodemailer = require('nodemailer');

/**
 * Creates an Ethereal test account and sends a dummy order confirmation.
 * Doesn't require real SMTP credentials, perfect for testing.
 */
async function sendOrderConfirmation(userEmail, order, items) {
  try {
    // 1. Generate test SMTP service account from ethereal.email
    const testAccount = await nodemailer.createTestAccount();

    // 2. Create a transporter object
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    // 3. Build the HTML body
    const itemsHtml = items.map(i => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${i.Product?.name || 'Item'}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${i.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">₹${Number(i.price).toLocaleString('en-IN')}</td>
      </tr>
    `).join('');

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff9900;">Order Confirmation</h2>
        <p>Hello,</p>
        <p>Thank you for shopping with us! Your order <strong>#${order.id}</strong> has been successfully placed.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background-color: #f3f3f3;">
              <th style="text-align: left; padding: 10px;">Item</th>
              <th style="text-align: left; padding: 10px;">Qty</th>
              <th style="text-align: left; padding: 10px;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="text-align: right; padding: 10px; font-weight: bold;">Total:</td>
              <td style="padding: 10px; font-weight: bold; color: #B12704;">₹${Number(order.total_amount).toLocaleString('en-IN')}</td>
            </tr>
          </tfoot>
        </table>

        <p style="margin-top: 30px; font-size: 14px; color: #555;">
          We'll send you another email when your order ships.
        </p>
      </div>
    `;

    // 4. Send email
    const info = await transporter.sendMail({
      from: '"Amazon Replica" <no-reply@amazon-replica.local>',
      to: userEmail || 'guest@example.com', // fallback for guests
      subject: `Your Amazon Replica order #${order.id} is confirmed`,
      html: htmlBody,
    });

    console.log('\n=============================================');
    console.log('📧 ORDER CONFIRMATION EMAIL SENT!');
    console.log('Message ID: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    console.log('=============================================\n');

  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
  }
}

module.exports = { sendOrderConfirmation };
