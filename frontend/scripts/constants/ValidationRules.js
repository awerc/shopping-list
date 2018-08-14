const required = value => (value ? null : 'Заполните это поле');

const positiveNumber = value => (isNaN(value) || value <= 0 ? 'Значение должно быть положительным числом' : null);

export { required, positiveNumber };
