module.exports = {
  components: {
    schemas: {
      Account: {
        type: "object",
        properties: {
          creationDate: {
            type: "string",
            description: "Fecha de creacion de la cuenta",
            example: "2022-10-26 10:00:00",
          },
          money: {
            type: "number",
            description: "Cantidad de dinero que la cuenta posee",
            example: 150,
          },
          isBlocked: {
            type: "boolean",
            description: "Determina si la cuenta esta bloqueada o no",
            example: false,
          },
          userId: {
            type: "number",
            description: "Es el usuario dueno de la cuenta",
            example: 1,
          },
        },
      },
      Catalogue: {
        type: "object",
        properties: {
          product_description: {
            type: "string",
            description: "Descripcion del producto",
            example: "Automovil Lamborghini Diablo",
          },
          image: {
            type: "string",
            description: "URL hacia la imagen representativa del producto",
            example: "https://www.example.com/lamborghini.jpg",
          },
          points: {
            type: "number",
            description:
              "Cantidad de puntos que se requieren para intercambiar por este producto",
            example: 2500,
          },
        },
      },
      FixedTermDeposit: {
        type: "object",
        properties: {
          userId: {
            type: "number",
            description: "El ID del usuario al que pertenece el plazo fijo",
            example: 1,
          },
          accountId: {
            type: "number",
            description: "El ID de la cuenta donde se realiza el plazo fijo",
            example: 1,
          },
          amount: {
            type: "number",
            description: "La cantidad de dinero en el plazo fijo",
            example: 100,
          },
          creation_date: {
            type: "string",
            description: "La fecha de creacion del plazo fijo",
            example: "2022-10-26",
          },
          closing_date: {
            type: "string",
            description: "La fecha de cierre del plazo fijo",
            example: "2022-11-26",
          },
        },
      },
      Role: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Nombre del rol",
            example: "Administrador",
          },
          description: {
            type: "string",
            description: "Descripcion del rol",
            example: "Usuarios administradores del sitio",
          },
        },
      },
      User: {
        type: "object",
        properties: {
          first_name: {
            type: "string",
            description: "Nombre del usuario",
            example: "Juan",
          },
          last_name: {
            type: "string",
            description: "Apellido del usuario",
            example: "Perez",
          },
          email: {
            type: "string",
            description:
              "Correo electronico del usuario (se usa al iniciar sesion)",
            example: "juanperez@example.com",
          },
          password: {
            type: "string",
            description: "Contrasena del usuario (se usa al iniciar sesion)",
            example: "abc123",
          },
          points: {
            type: "number",
            description:
              "Puntos que el usuario puede usar para cambiar por productos del catalogo; los obtiene realizando depositos o transferencias",
            example: 50,
          },
        },
      },
      Transaction: {
        type: "object",
        properties: {
          amount: {
            type: "number",
            description: "Cantidad de dinero correspondiente a la transaccion",
            example: 500,
          },
          concept: {
            type: "string",
            description: "Descripcion de la transaccion",
            example: "Pago de honorarios",
          },
          date: {
            type: "string",
            description: "Fecha de la transaccion",
            example: "2022-10-26 15:00:00",
          },
          type: {
            type: "string",
            description: "Tipo de transaccion ('topup' o 'payment')",
            example: "topup",
          },
          accountId: {
            type: "number",
            description: "Cuenta origen de la transaccion",
            example: 1,
          },
          userId: {
            type: "number",
            description: "Usuario originante de la transaccion",
            example: 4,
          },
          to_account_id: {
            type: "number",
            description: "Cuenta destino de la transaccion",
            example: 5,
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          error: {
            type: "string",
            description: "Mensaje descriptivo del error que se produjo",
            example: "No autorizado",
          },
          status: {
            type: "number",
            description: "Codigo de error HTTP",
            example: 401,
          },
        },
      },
      LoginResult: {
        type: "object",
        properties: {
          accessToken: {
            type: "string",
            description:
              "El token JWT que debera enviarse posteriormente a los endpoints",
          },
        },
      },
      LoginInput: {
        type: "object",
        properties: {
          email: {
            type: "string",
            description:
              "Correo electronico del usuario que iniciara la sesion",
          },
          password: {
            type: "string",
            description: "Contrasena del usuario que iniciara la sesion",
          },
        },
      },
    },
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};
