module.exports = {
  "/accounts": {
    post: {
      security: [
        {
          BearerAuth: [],
        },
      ],
      tags: ["Accounts"],
      description: "Crear una cuenta",
      summary: "Crear una cuenta",
      parameters: [],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Account",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Cuenta creada exitosamente",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Account",
              },
            },
          },
        },
        401: {
          description: "Sin acceso",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        403: {
          description: "Acceso prohibido",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
    get: {
      security: [
        {
          BearerAuth: [],
        },
      ],

      tags: ["Accounts"],
      description: "Listar todas las cuentas",
      summary: "Listar todas las cuentas",
      parameters: [],
      responses: {
        200: {
          description: "Operacion exitosa",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Account",
              },
            },
          },
        },
        401: {
          description: "Sin acceso",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        403: {
          description: "Acceso prohibido",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
  },
  "/accounts/{id}": {
    post: {
      security: [
        {
          BearerAuth: [],
        },
      ],
      tags: ["Accounts"],
      description: "Depositar o transferir dinero hacia una cuenta",
      summary: "Depositar o transferir",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description:
            "Cuenta hacia la que se va a depositar o transferir el dinero",
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/DepositOrTransfer",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Deposito o transferencia exitosos",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/OK",
              },
            },
          },
        },
        404: {
          description: "No se encontro cuenta de origen o destino",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        403: {
          description: "Cuenta origen o destino bloqueada",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        400: {
          description:
            "La cuenta origen no tiene suficiente saldo / Tipo de transaccion no valido",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
    get: {
      security: [
        {
          BearerAuth: [],
        },
      ],

      tags: ["Accounts"],
      description: "Ver detalle de una cuenta",
      summary: "Ver detalle de una cuenta",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID de la cuenta",
        },
      ],
      responses: {
        200: {
          description: "Operacion exitosa",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Account",
              },
            },
          },
        },
        401: {
          description: "Sin acceso",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        403: {
          description: "Acceso prohibido",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
    put: {
      security: [
        {
          BearerAuth: [],
        },
      ],

      tags: ["Accounts"],
      description: "Modificar una cuenta existente",
      summary: "Modificar una cuenta existente",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID de la cuenta",
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Account",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Operacion exitosa",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Role",
              },
            },
          },
        },
        401: {
          description: "Sin acceso",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        403: {
          description: "Acceso prohibido",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
    delete: {
      security: [
        {
          BearerAuth: [],
        },
      ],

      tags: ["Accounts"],
      description: "Eliminar una cuenta",
      summary: "Eliminar una cuenta",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID de la cuenta",
        },
      ],
      responses: {
        200: {
          description: "Operacion exitosa",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Account",
              },
            },
          },
        },
        401: {
          description: "Sin acceso",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        403: {
          description: "Acceso prohibido",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
  },
};
