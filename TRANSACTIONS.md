**Transacciones**
----
  Peticiones necesarias para crear, recibir, buscar, eliminar y actualizar los datos de una transacción.

* **URL**

  >api/transactions
  
* **Métodos aceptados:**
  
  `GET` Devuelve la lista con toda las transacciones registradas.
  
  `POST` Registra una transacción.
  
  `DELETE` Elimina una transacción.
  
  `PUT` Actualiza una transacción.

  `GET` | `POST` | `DELETE` | `PUT`
  
*  **Parámetors de URL**

   >`GET` api/transactions
   
   Obtiene una lista con todas las transacciones y su cliente.
   
   >`GET` | `DELETE` | `PUT` api/transactions/id
   
   `GET` Obtiene la transacción con el id asociado con su cliente
   
   `DELETE` Elimina a la transacción con el id asociado.
   
   `PUT` Actualiza los datos de la transacción con el id asociado.
   
   >`GET` api/transactions?first_name=A&second...
   
   Devulve un cliente con los parámetros establecidos:
   
   _Parámetros disponibles:_
   
   - customer
   
   - date
   
   - amount
   
   De no haber resultados que coincidan se devuelve una tupla vacía.
   
   **Requisitos:**
 
   `id=[integer]`

* **Parámetros de cuerpo**

    >`POST` api/transactions
    
    La petición debe tener el siguiente cuerpo
    
    ```json
    {
      "customer": customer_id,
      "date": "13-12-1998",
      "amount": 10.3
    }
    ```
    
    El campo ``date`` es de formato opcional, ante cualquier ambiguedad buscará el formato que crea pertinente.
    
    El campo ``date`` es opcional, de no colocarse se establece la hora en la que se crea la transacción.
    
    El campo ``date`` es capaz de establecer los años de 2 dígitos como 98=1998 o 22=2022
    
    Si se quiere total precisión con los datos ``date`` es guardado en formato ISO-8601 "yyYY-mm-ddThh:mm:ss.000Z"
    
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