module.exports = {
  "/users": {
    post: {
      tags: ["Users"],
      description: "Crear un usuario",
      summary: "Crear un usuario",
      parameters: [],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Usuario creado exitosamente",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
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
        500: {
          description: "Error de servidor",
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

      tags: ["Users"],
      description: "Listar todos los usuarios",
      summary: "Listar todos los usuarios",
      parameters: [],
      responses: {
        200: {
          description: "Operacion exitosa",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
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
          description: "Sin acceso de administrador",
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
  "/users/{id}": {
    get: {
      tags: ["Users"],
      description: "Ver detalle de un usuario",
      summary: "Ver detalle de un usuario",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID del usuario",
        },
      ],
      responses: {
        200: {
          description: "Operacion exitosa",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
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
      tags: ["Users"],
      summary: "Modificar un usuario existente",
      description: "Modificar un usuario existente",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID del rol",
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User",
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
                $ref: "#/components/schemas/User",
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
      summary: "Eliminar un usuario",
      tags: ["Users"],
      description: "Elimina un usuario",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID del usuario",
        },
      ],
      responses: {
        200: {
          description: "Eliminacion exitosa",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
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
  "/users/block/{accountId}": {
    patch: {
      security: [
        {
          BearerAuth: [],
        },
      ],
      tags: ["Users"],
      summary: "Bloquear una cuenta del usuario",
      description:
        "Bloquear una cuenta del usuario, evitando que sea utilizada",
      parameters: [
        {
          name: "accountId",
          in: "path",
          required: true,
          type: "number",
        },
      ],
      responses: {
        200: {
          description: "Cuenta bloqueada satisfactoriamente",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/OK",
              },
            },
          },
        },
        404: {
          description: "No se encuentra la cuenta que se quiere bloquear",
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
  "/users/unblock/{accountId}": {
    patch: {
      security: [
        {
          BearerAuth: [],
        },
      ],
      tags: ["Users"],
      summary: "Desbloquear una cuenta del usuario",
      description:
        "Desbloquear una cuenta del usuario, permitiendo que sea utilizada",
      parameters: [
        {
          name: "accountId",
          in: "path",
          required: true,
          type: "number",
        },
      ],
      responses: {
        200: {
          description: "Cuenta desbloqueada satisfactoriamente",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/OK",
              },
            },
          },
        },
        404: {
          description: "No se encuentra la cuenta que se quiere desbloquear",
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
  "/users/resetPassword/{userId}": {
    patch: {
      tags: ["Users"],
      summary: "Resetear contraseña",
      description: "Resetear la contraseña del usuario",
      parameters: [
        {
          name: "userId",
          required: true,
          in: "path",
          type: "number",
        }
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ChangePasswordInput"
            }
          }
        }
      },
      responses: {
        200: {
          description: "La contraseña se reseteo satisfactoriamente",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/OK"
              }
            }
          }
        },
        400: {
          description: "No se especifico el usuario a modificar",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error"
              }
            }
          }
        },
        404: {
          description: "Usuario inexistente",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error"
              }
            }
          }
        }
      }
    }
  },
  "/users/product/{productId}": {
    patch: {
      security: [
        {
          BearerAuth: [],
        },
      ],
      tags: ["Users"],
      summary: "Intercambiar puntos por un producto del catalogo",
      description: "Intercambiar puntos por un producto del catalogo",
      parameters: [
        {
          name: "productId",
          required: true,
          in: "path",
          type: "number",
          description: "ID del producto que se desea intercambiar",
        },
      ],
      responses: {
        200: {
          description: "Puntos intercambiados exitosamente",
          content: {
            "application/json": {
              schemas: {
                $ref: "#/components/schemas/OK",
              },
            },
          },
        },
        400: {
          description: "Usuario inexistente",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        400: {
          description: "Producto inexistente",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        403: {
          description: "No se dispone de suficientes puntos",
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
