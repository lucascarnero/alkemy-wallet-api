module.exports = {
  "/fixeddeposits": {
    post: {
      security: [
        {
          BearerAuth: [],
        },
      ],
      tags: ["FixedTermDeposits"],
      description: "Crear un deposito a plazo fijo",
      summary: "Crear un deposito a plazo fijo",
      parameters: [],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/FixedTermDeposit",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Deposito creado exitosamente",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/FixedTermDeposit",
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

      tags: ["FixedTermDeposits"],
      description: "Listar todos depositos a plazo fijo del usuario",
      summary: "Listar depositos",
      parameters: [],
      responses: {
        200: {
          description: "Operacion exitosa",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/FixedTermDeposit",
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
  "/fixeddeposits/{id}": {
    get: {
      security: [
        {
          BearerAuth: [],
        },
      ],

      tags: ["FixedTermDeposits"],
      description: "Ver detalle de un deposito",
      summary: "Ver detalle de un deposito",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID del deposito",
        },
      ],
      responses: {
        200: {
          description: "Operacion exitosa",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/FixedTermDeposit",
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

      tags: ["FixedTermDeposits"],
      description: "Modificar un deposito a plazo fijo existente",
      summary: "Modificar un deposito a plazo fijo existente",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID del plazo fijo",
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/FixedTermDeposit",
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
                $ref: "#/components/schemas/FixedTermDeposit",
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

      tags: ["FixedTermDeposits"],
      description: "Eliminar un deposito a plazo fijo",
      summary: "Eliminar un deposito a plazo fijo",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID del plazo fijo",
        },
      ],
      responses: {
        200: {
          description: "Operacion exitosa",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/FixedTermDeposit",
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
