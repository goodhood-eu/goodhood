export const action = (label) => (...data) => {
  console.log(
    `%c ACTION %c ${label} `,
    'background: #93a70a; color: #fff',
    'background: #393939; color: #fff',
    ...data,
  );
};
