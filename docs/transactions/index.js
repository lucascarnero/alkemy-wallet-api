module.exports = {
  "/transactions": {
    post: {
      security: [
        {
          BearerAuth: [],
        },
      ],
      tags: ["Transactions"],
      description: "Crear una transaccion",
      summary: "Crear una transaccion",
      parameters: [],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Transaction",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Transaccion creada exitosamente",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Transaction",
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

      tags: ["Transactions"],
      description: "Listar todas las transacciones del usuario",
      summary: "Listar todas las transacciones del usuario",
      parameters: [],
      responses: {
        200: {
          description: "Operacion exitosa",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Transaction",
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
  "/transactions/{id}": {
    get: {
      security: [
        {
          BearerAuth: [],
        },
      ],

      tags: ["Transactions"],
      description: "Ver detalle de una transaccion",
      summary: "Ver detalle de una transaccion",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID de la transaccion",
        },
      ],
      responses: {
        200: {
          description: "Operacion exitosa",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Transaction",
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

      tags: ["Transactions"],
      description: "Modificar una transaccion existente",
      summary: "Modificar una transaccion",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID de la transaccion",
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Transaction",
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
                $ref: "#/components/schemas/Transaction",
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

      tags: ["Transactions"],
      description: "Eliminar una transaccion",
      summary: "Eliminar una transaccion",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID de la transaccion",
        },
      ],
      responses: {
        200: {
          description: "Operacion exitosa",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Transaction",
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
