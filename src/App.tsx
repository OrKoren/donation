import React, { useState } from 'react';
import './App.css';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_12345'); // Replace with your Stripe public key

const NAV = [
  { key: 'home', label: 'עמוד הבית' },
  { key: 'about', label: 'אודות' },
  { key: 'volunteer', label: 'רוצה להתנדב?' },
];

function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="App" style={{ direction: 'rtl', fontFamily: 'Arial', background: '#f7f7f7', minHeight: '100vh' }}>
      {/* Navigation Bar */}
      <nav style={{ background: '#fff', boxShadow: '0 2px 8px #eee', padding: '0 32px', display: 'flex', alignItems: 'center', height: 60, flexDirection: 'row-reverse' }}>
        <div style={{ display: 'flex', gap: 32, marginRight: 0, marginLeft: 'auto' }}>
          {NAV.map(item => (
            <button
              key={item.key}
              onClick={() => setPage(item.key)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 18,
                fontWeight: page === item.key ? 'bold' : 'normal',
                color: page === item.key ? '#635bff' : '#222',
                cursor: 'pointer',
                borderBottom: page === item.key ? '2px solid #635bff' : '2px solid transparent',
                padding: '8px 0',
                transition: 'color 0.2s',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
      {/* Page Content */}
      {page === 'home' && (
        <>
          <div style={{ height: 32 }} />
          <h2 style={{ textAlign: 'center', marginBottom: 16 }}>תושבים יקרים</h2>
          <div className="App-content" style={{ maxWidth: 500, margin: '0 auto', fontSize: 18, background: '#fff', padding: 12, borderRadius: 12, boxShadow: '0 2px 8px #ccc' }}>
            <p style={{ marginBottom: 8 }}>
              בחודשים הקרובים תחל סלילת כביש בין 6 נתיבים לפחות, <b><u>צמוד ומצפון לשכונה</u></b>,<br />
              תוך חיבור כביש 40 לתל-אביב דרך אזורי התעשייה סגולה וקריית אריה, לרבות:
            </p>
            <ul style={{ marginRight: 24, marginBottom: 8 }}>
              <li>כביש בן 6 נתיבים צמוד לבית ספר פאול קור</li>
              <li>גשר נתיבים במקביל בצומת העיפרון</li>
              <li>צומת גדול עם רחוב ראשון לציון</li>
            </ul>
            <div className="App-images" style={{ display: 'flex', justifyContent: 'center', gap: 32, margin: '32px 0' }}>
              <img src={'/image1.png'} alt="גשר חדש" style={{ width: 350, borderRadius: 12, boxShadow: '0 2px 8px #ccc' }} />
              <img src={'/image2.png'} alt="פקקים" style={{ width: 350, borderRadius: 12, boxShadow: '0 2px 8px #ccc' }} />
            </div>
            <p style={{ marginBottom: 8 }}>
              תכנון הכביש לוקה בחסר ויגרום לפגיעה קשה באיכות החיים בשכונה כולה כשיביא עלינו רעש, זיהום אוויר, קושי בשינה, פקקים ועוד מפגעים.<br />
              זאת נוסף על שנים של רעש מהעבודות, שהקבלן יבצע בשעות הלילה.
            </p>
            <div style={{ fontWeight: 'bold', margin: '16px 0', fontSize: 20 }}>
              כך שתחשבו בתושבי השכונה ולא תפגע באיכות חיינו!
            </div>
          </div>
          <div className="donate-buttons-mobile" style={{ display: 'flex', justifyContent: 'center', gap: 48, marginTop: 32 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 220 }}>
              <h4 style={{ textAlign: 'center' }}>תרמו ב-PayPal</h4>
              <div style={{ width: 200, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PayPalScriptProvider options={{ "client-id": "test" }}>
                  <PayPalButtons style={{ layout: 'horizontal', height: 40, width: 200 }} forceReRender={[10]} createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{ amount: { value: '10.00' } }],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order?.capture().then(() => {
                      alert('תודה על תרומתך!');
                    });
                  }}
                  />
                </PayPalScriptProvider>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 220 }}>
              <h4 style={{ textAlign: 'center' }}>תרמו ב-Stripe</h4>
              <form action="https://buy.stripe.com/test_4gwcNw6kQ2wQ2yQeUU" method="GET" target="_blank" style={{ width: 200, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <button type="submit" style={{ width: 200, height: 40, fontSize: 18, background: '#635bff', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', textAlign: 'center' }}>
                  תרום 10 ש"ח
                </button>
              </form>
            </div>
          </div>
        </>
      )}
      {page === 'about' && (
        <div style={{ maxWidth: 700, margin: '40px auto', fontSize: 18, background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 8px #ccc' }}>
          <h2 style={{ textAlign: 'center', marginBottom: 16 }}>אודות</h2>
          <p>
            עמותת "אם המושבות" פועלת לשמירה על איכות החיים, הסביבה והקהילה בשכונת אם המושבות. אנו פועלים בהתנדבות למען התושבים, עוזרים במאבקים סביבתיים, תומכים ביוזמות קהילתיות, ומקדמים חיי קהילה בריאים ובטוחים.
          </p>
        </div>
      )}
      {page === 'volunteer' && (
        <div style={{ maxWidth: 700, margin: '40px auto', fontSize: 18, background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 8px #ccc' }}>
          <h2 style={{ textAlign: 'center', marginBottom: 16 }}>רוצה להתנדב?</h2>
          <p>
            נשמח לכל עזרה! מתנדבים יכולים לסייע בהפצת מידע, ארגון אירועים, גיוס תרומות, עזרה משפטית, פעילות ברשתות החברתיות ועוד. מלאו את פרטיכם בטופס צור קשר ונחזור אליכם בהקדם.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
