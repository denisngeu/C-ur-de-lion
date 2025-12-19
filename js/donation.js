// Donation page JavaScript
// Handles donation amount selection and PayPal integration

let selectedAmount = 0;
let donationType = 'one-time';

document.addEventListener('DOMContentLoaded', () => {
  // Amount buttons
  const amountButtons = document.querySelectorAll('.amount-btn');
  const customAmountBtn = document.querySelector('.custom-amount-btn');
  const customAmountContainer = document.getElementById('customAmountContainer');
  const customAmountInput = document.getElementById('customAmount');
  const amountValue = document.getElementById('amountValue');
  
  // Donation type radio buttons
  const donationTypeRadios = document.querySelectorAll('input[name="donationType"]');
  
  // Handle amount button clicks
  amountButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (button.classList.contains('custom-amount-btn')) {
        // Show custom amount input
        customAmountContainer.style.display = 'block';
        amountButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        selectedAmount = 0;
        amountValue.textContent = '0 \u20ac';
        customAmountInput.focus();
      } else {
        // Predefined amount selected
        customAmountContainer.style.display = 'none';
        amountButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        selectedAmount = parseInt(button.dataset.amount);
        amountValue.textContent = selectedAmount + ' \u20ac';
        customAmountInput.value = '';
        // Render PayPal buttons
        renderPayPalButtons();
      }
    });
  });
  
  // Handle custom amount input
  customAmountInput.addEventListener('input', () => {
    const value = parseInt(customAmountInput.value);
    if (value && value > 0) {
      selectedAmount = value;
      amountValue.textContent = selectedAmount + ' \u20ac';
      renderPayPalButtons();
    } else {
      selectedAmount = 0;
      amountValue.textContent = '0 \u20ac';
    }
  });
  
  // Handle donation type change
  donationTypeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      donationType = e.target.value;
      if (selectedAmount > 0) {
        renderPayPalButtons();
      }
    });
  });
});

// Render PayPal buttons
function renderPayPalButtons() {
  const container = document.getElementById('paypal-button-container');
  
  if (selectedAmount <= 0) {
    container.innerHTML = '<p style="text-align: center; color: #999;">Veuillez s\u00e9lectionner un montant pour continuer</p>';
    return;
  }
  
  // Clear existing buttons
  container.innerHTML = '';
  
  // Check if PayPal SDK is loaded
  if (typeof paypal === 'undefined') {
    container.innerHTML = '<p style="text-align: center; color: #e53935;">Erreur: PayPal SDK n\'est pas charg\u00e9. Veuillez recharger la page.</p>';
    return;
  }
  
  // Render PayPal button
  paypal.Buttons({
    style: {
      layout: 'vertical',
      color: 'gold',
      shape: 'rect',
      label: 'paypal'
    },
    
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [{
          description: donationType === 'monthly' ? 'Don mensuel \u00e0 C\u0153ur de Lion 90' : 'Don \u00e0 C\u0153ur de Lion 90',
          amount: {
            currency_code: 'EUR',
            value: selectedAmount.toString()
          }
        }]
      });
    },
    
    onApprove: (data, actions) => {
      return actions.order.capture().then((details) => {
        // Success! Show confirmation
        alert('Merci pour votre don de ' + selectedAmount + '\u20ac ! Votre transaction a \u00e9t\u00e9 compl\u00e9t\u00e9e avec succ\u00e8s. Un re\u00e7u fiscal vous sera envoy\u00e9 par email.');
        // Here you would typically send transaction details to your server
        console.log('Transaction completed by ' + details.payer.name.given_name);
        console.log('Transaction ID: ' + details.id);
        
        // Reset form
        selectedAmount = 0;
        document.getElementById('amountValue').textContent = '0 \u20ac';
        document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('selected'));
        document.getElementById('customAmount').value = '';
        document.getElementById('customAmountContainer').style.display = 'none';
        container.innerHTML = '<p style="text-align: center; color: #4caf50; font-weight: bold;">\u2713 Don re\u00e7u avec succ\u00e8s !</p>';
      });
    },
    
    onError: (err) => {
      console.error('PayPal Error:', err);
      alert('Une erreur est survenue lors du traitement de votre paiement. Veuillez r\u00e9essayer.');
    },
    
    onCancel: (data) => {
      alert('Paiement annul\u00e9. N\'h\u00e9sitez pas \u00e0 r\u00e9essayer quand vous le souhaitez.');
    }
  }).render('#paypal-button-container');
}
