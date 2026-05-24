// lib/email.ts
type LeadData = {
  name: string;
  phone: string;
  suburb: string;
  source: string;
  funeral_home_name?: string;
  offer_title?: string;
  service_type?: string;
  budget?: string;
  message?: string | null;
};

export async function sendLeadNotification(leadData: LeadData) {
  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY || '',
      },
      body: JSON.stringify({
        sender: { 
          email: 'leads@safuneralhomes.co.za', 
          name: 'SA Funeral Homes' 
        },
        to: [{ email: 'criptonique@gmail.com' }], 
        subject: `New Lead: ${leadData.name} - ${leadData.source}`,
        htmlContent: `
          <h2>New Lead Received</h2>
          <p><strong>Name:</strong> ${leadData.name}</p>
          <p><strong>Phone:</strong> ${leadData.phone}</p>
          <p><strong>Suburb:</strong> ${leadData.suburb}</p>
          ${leadData.funeral_home_name ? `<p><strong>Funeral Home:</strong> ${leadData.funeral_home_name}</p>` : ''}
          <p><strong>Source:</strong> ${leadData.source}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString('en-ZA')}</p>
        `
      })
    });

    if (response.ok) {
      console.log('✅ Brevo Email Sent');
    } else {
      console.error('❌ Brevo Error:', await response.text());
    }
  } catch (error) {
    console.error('❌ Email sending failed:', error);
  }
}