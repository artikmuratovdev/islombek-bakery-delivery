export const setNumber = (number: string) => {
    if (number.startsWith('+998') || number.startsWith('998')) {
      return (
        number.slice(4, 6) +
        ' ' +
        number.slice(6, 9) +
        ' ' +
        number.slice(9, 11) +
        ' ' +
        number.slice(11)
      );
    }
    if (number.length === 9) {
      return (
        number.slice(0, 2) +
        ' ' +
        number.slice(2, 5) +
        ' ' +
        number.slice(5, 7) +
        ' ' +
        number.slice(7, 9)
      );
    }
  };