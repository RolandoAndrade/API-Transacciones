**Clientes**
----
  Peticiones necesarias para crear, recibir, buscar, eliminar y actualizar los datos de un cliente.

* **URL**

  >api/customers

* **Métodos aceptados:**
  
  `GET` Devuelve la lista con todos los clientes registrados.
  
  `POST` Registra un cliente.
  
  `DELETE` Elimina un cliente.
  
  `PUT` Actualiza un cliente.

  `GET` | `POST` | `DELETE` | `PUT`
  
*  **Parámetors de URL**

   >`GET` api/customers
   
   Obtiene una lista con todos los clientes.
   
   >`GET` | `DELETE` | `PUT` api/customers/id
   
   `GET` Obtiene al cliente con el id asociado
   
   `DELETE` Elimina al cliente con el id asociado con sus transacciones realizadas.
   
   `PUT` Actualiza los datos del cliente con el id asociado.
   
   >`GET` api/customers?queries
   
   Devulve un cliente con los parámetros establecidos:
   
   _Parámetros disponibles:_
   
   - first_name
   
   - second_name
   
   - first_surname
   
   - second_surname
   
   - email
   
   De no haber resultados que coincidan se devuelve una tupla vacía.
   
   **Requisitos:**
 
   `id=[integer]`

* **Parámetros de cuerpo**

    >`POST` api/customers
    
    La petición debe tener el siguiente cuerpo
    
    ```json
    {
      "first_name": "Pablo",
      "second_name": "Pedro",
      "first_surname": "Pérez",
      "second_surname": "Pal",
      "email": "pablo@example.com"
    }
    ```
    
    El campo ``second_name`` es opcional.
    
    >`UPDATE` api/customers/{id}
    
    El cuerpo de la petición debe tener la siguiente forma:
    
    ```json
        {
          "first_name": "Pablo",
          "second_name": "Pedro",
          "first_surname": "Pérez",
          "second_surname": "Pal",
          "email": "pablo@example.com"
        }
    ```
    
    Todos los campos son opcionales.
    
    Se permiten solo peticiones con cuerpo de contenido de tipo:
        
    >application/json
        
    >application/x-www-form-urlencoded
        
    
* **Respuesta exitosa:**
  
    >`GET` api/customers
    
    ```json
        {
            "status": "success",
            "data": [
            {
               "id": 1,
               "first_name": "Pedro",
               "second_name": "Pablo",
               "first_surname": "Pérez",
               "second_surname": "Pal",
               "email": "pedro@example.com"
           },
           {
               "id": 2,
               "first_name": "José",
               "second_name": "",
               "first_surname": "Jor",
               "second_surname": "Jent",
               "email": "jent@example.com"
           }
           ]
        }
    ```
    
     >`GET` | `PUT` api/customers/1
  
    ```json
    {
        "status": "success",
        "data": {
            "id": 1,
            "first_name": "Pablo",
            "second_name": "Pedro",
            "first_surname": "Pérez",
            "second_surname": "Pal",
            "email": "pedro@example.com"
        }
    }
    ```
    
    >`POST` api/customers
      
     ```json
     {
         "status": "success",
         "data": 
         {
             "id": 1,
             "first_name": "Pablo",
             "second_name": "Pedro",
             "first_surname": "Pérez",
             "second_surname": "Pal",
             "email": "pedro@example.com"
         }
     }
     ```
 
* **Respuesta errónea:**

  >`GET` | `PUT` | `DELETE` api/customers/1000

  ```json
       {
           "status": "error",
           "message": "There is not an user with this ID"
       }
  ```
        
  >`GET` | `PUT` | `DELETE` api/customers/A

  ```json
    {
        "status": "error",
        "message": {
            "status": 404
        }
    }
  ```
  
  >`POST` api/customers
  
  ```json
      {
          "status": "error",
          "message": "Property '{property missing}' doesn't exist."
      }
  ```
  
  >`POST` api/customers | `PUT` api/customers/1
  
  ```json
        {
            "status": "error",
            "message": "Email format incorrect"
        }
    ```
    
  ```json
        {
            "status": "error",
            "message": "Email already registered"
        }
    ```