'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  const date = new Date(Date.now());
  const today = {
    year: date.getUTCFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual(2023, 6, 1)).toBe('string');
  });

  it(`should ask to change the password if was changed a year ago`, () => {
    const passwordStatus = isPasswordActual(
      today.year - 1,
      today.month,
      today.date);

    expect(passwordStatus)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was changed'
  more than 60 days ago`, () => {
    const passwordStatus = isPasswordActual(
      today.year,
      today.month,
      today.date - 61);

    expect(passwordStatus)
      .toBe('Immediately change the password!');
  });

  it(`should ask to change the password if was changed 
  less than 60 days ago`, () => {
    const passwordStatus = isPasswordActual(
      today.year,
      today.month,
      today.date - 60);

    expect(passwordStatus)
      .toBe('You should change your password.');
  });

  it(`should ask to change the password if was changed 
  more than 30 days ago`, () => {
    const passwordStatus = isPasswordActual(
      today.year,
      today.month,
      today.date - 31);

    expect(passwordStatus)
      .toBe('You should change your password.');
  });

  it(`should return the password is actual if was changed 
   less than 30 days ago`, () => {
    const passwordStatus = isPasswordActual(
      today.year,
      today.month,
      today.date - 30);

    expect(passwordStatus)
      .toBe('Password is actual.');
  });
});
