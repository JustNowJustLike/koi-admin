export function success<T extends Record<any, any>>(
  result?: T,
  message = 'ok',
) {
  return {
    code: 0,
    result,
    message,
    type: 'success',
  };
}

export function pagination<T>(items: T[], total = 0) {
  return {
    code: 0,
    result: {
      items,
      total,
    },
    message: 'ok',
    type: 'success',
  };
}
