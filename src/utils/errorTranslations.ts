// Traducción de mensajes de error de Firebase
export const translateFirebaseError = (errorMessage: string): string => {
  const errorMap: { [key: string]: string } = {
    'auth/invalid-email': 'El correo electrónico no es válido',
    'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
    'auth/user-not-found': 'No se encontró una cuenta con este correo electrónico',
    'auth/wrong-password': 'La contraseña es incorrecta',
    'auth/email-already-in-use': 'Este correo electrónico ya está en uso',
    'auth/operation-not-allowed': 'Esta operación no está permitida',
    'auth/weak-password': 'La contraseña es demasiado débil',
    'auth/invalid-credential': 'Las credenciales son incorrectas',
    'auth/too-many-requests': 'Demasiados intentos. Por favor, intenta más tarde',
    'auth/network-request-failed': 'Error de conexión. Verifica tu internet',
    'auth/popup-closed-by-user': 'La ventana de autenticación fue cerrada',
    'auth/cancelled-popup-request': 'La solicitud fue cancelada',
  };

  // Buscar el código de error en el mensaje
  for (const [errorCode, translatedMessage] of Object.entries(errorMap)) {
    if (errorMessage.includes(errorCode)) {
      return translatedMessage;
    }
  }

  // Si no se encuentra traducción, devolver el mensaje original
  return errorMessage;
};

