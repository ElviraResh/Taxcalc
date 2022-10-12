const formatCurrency = n =>
  new Intl.NumberFormat('ru-Ru', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 2,
  }).format(n);

const navigationLinks = document.querySelectorAll('.navigation__link');
const calcElems = document.querySelectorAll('.calc');

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener('click', (e) => {
    e.preventDefault();

    for (let j = 0; j < calcElems.length; j++) {
      if (navigationLinks[i].dataset.tax === calcElems[j].dataset.tax) {
        calcElems[j].classList.add('calc_active');
        navigationLinks[i].classList.add('navigation__link_active');
      } else {
        calcElems[j].classList.remove('calc_active');
        navigationLinks[j].classList.remove('navigation__link_active');
      }
    }
  });
};

// AUSN
const ausn = document.querySelector('.ausn');
const formAusn = ausn.querySelector('.calc__form');
const resultTaxTotal = ausn.querySelector('.result__tax_total');
const calcLabelExpenses = ausn.querySelector('.calc__label_expenses');

calcLabelExpenses.style.display = 'none';

formAusn.addEventListener('input', () => {
  if (formAusn.type.value === 'income') {
    calcLabelExpenses.style.display = 'none';
    resultTaxTotal.textContent = formatCurrency(formAusn.income.value * 0.08);
    formAusn.expenses.value = '';
  }
  if (formAusn.type.value === 'expenses') {
    calcLabelExpenses.style.display = 'block';
    resultTaxTotal.textContent = formatCurrency((formAusn.income.value - formAusn.expenses.value) * 0.2);
  }
});

// Self-employment

const selfEmployment = document.querySelector('.self-employment');
const formSelfEmployment = selfEmployment.querySelector('.calc__form');
const resultTaxTotalSelfEmployment = selfEmployment.querySelector('.result__tax');
const calckCompensation = selfEmployment.querySelector('.calc__label_compensation');
const resultBlockCompensation = selfEmployment.querySelectorAll('.result__block_compensation');
const resultTaxCompensation = selfEmployment.querySelector('.result__tax_compensation');
const resultTaxRestCompensation = selfEmployment.querySelector('.result__tax_rest-compensation');
const resultTaxResult = selfEmployment.querySelector('.result__tax_result');

const checkCompensation = () => {
  const setDisplay = formSelfEmployment.addCompensation.checked ? 'block' : 'none';
  calckCompensation.style.display = setDisplay;
  resultBlockCompensation.forEach((elem) => {
    elem.style.display = setDisplay;
  });
};

checkCompensation();

formSelfEmployment.addEventListener('input', () => {
  const resIndividual = formSelfEmployment.individual.value * 0.04;
  const resEntity = formSelfEmployment.entity.value * 0.06;

  checkCompensation();

  const tax = resIndividual + resEntity;
  formSelfEmployment.compensation.value = formSelfEmployment.compensation.value > 10_000 
  ? 10_000 
  : formSelfEmployment.compensation.value;
  const benefit = formSelfEmployment.compensation.value;
  const resBenefit = formSelfEmployment.individual.value * 0.01 + formSelfEmployment.entity.value * 0.02;
  const finalBenefit = benefit - resBenefit > 0 ? benefit - resBenefit : 0;

  const finalTax = tax - (benefit - finalBenefit);

  resultTaxTotalSelfEmployment.textContent = formatCurrency(tax);
  resultTaxCompensation.textContent = formatCurrency(benefit - finalBenefit);
  resultTaxRestCompensation.textContent = formatCurrency(finalBenefit);
  resultTaxResult.textContent = formatCurrency(finalTax);
});

// OSN/OSNO

const osno = document.querySelector('.osno');
const formOsno = osno.querySelector('.calc__form');
const calcLabelIp = osno.querySelector('.calc__label_ip');
const calcLabelOoo = osno.querySelector('.calc__label_ooo');
const resultBlockIp = osno.querySelectorAll('.result__block_ip');
const resultBlockOoo = osno.querySelector('.result__block_ooo');

resultBlockIp.forEach((elem) => {
  elem.style.display = 'none';
});

resultBlockOoo.style.display = 'none';

formOsno.addEventListener('input', () => {
  if (formOsno.type.value === 'ip') {
    resultBlockIp.forEach((elem) => {
      elem.style.display = 'block';
    });
    
    resultBlockOoo.style.display = 'none';
  }
  if (formOsno.type.value === 'ooo') {
    resultBlockIp.forEach((elem) => {
      elem.style.display = 'none';
    });
    
    resultBlockOoo.style.display = 'block';
  }
});


/* const changeOsno = () => {
  if (formOsno.ip.checked) {
    resultBlockIp.forEach((elem) => {
      elem.style.display = 'block';
    });
  } else if (formOsno.ooo.checked) {
    resultBlockOoo.style.display = 'block';
  } else {
    resultBlockIp.forEach((elem) => {
      elem.style.display = 'none';
    })
    resultBlockOoo.style.display = 'none';
  }
}

changeOsno();  */



