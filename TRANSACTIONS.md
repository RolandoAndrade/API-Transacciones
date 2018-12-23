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
   
   >`GET` api/transactions?param1&param2...
   
   Devulve una transacción con los parámetros establecidos:
   
   _Parámetros disponibles:_
   
   - customer
   
   - date
   
   - amount
   
   >`GET` api/transactions/customers/{id}
   
   Obtiene una lista con todas las transacciones hechas por un cliente.
   
   De no haber resultados que coincidan se devuelve en cada caso una lista vacía.
 
   **Requisitos:**
 
   `id=[integer]`
   `amount=[float]`

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
    
    >`UPDATE` api/transactions/{id}
    
    El cuerpo de la petición debe tener la siguiente forma:
    
    ```json
        {
          "customer": customer_id,
          "date": "13-12-1998",
          "amount": 10.3
        }
    ```
    
    Todos los campos son opcionales.
    
    Se permiten solo peticiones con cuerpo de contenido de tipo:
        
    >application/json
        
    >application/x-www-form-urlencoded
        
    
* **Respuesta exitosa:**
  
    >`GET` api/transactions
    
    ```json
        {
            "status": "success",
            "data": [
            {
              "id": 1,
              "customer": {
                  "id": 1,
                  "first_name": "Pedro",
                  "second_name": "Pablo",
                  "first_surname": "Pérez",
                  "second_surname": "Pal",
                  "email": "rolandoandradefernandez@gmail.com",
                },
                "date": "2018-12-22T04:00:00.000Z",
                "amount": 10.3
            },
            {
              "id": 2,
              "customer": {
                  "id": 1,
                  "first_name": "Pedro",
                  "second_name": "Pablo",
                  "first_surname": "Pérez",
                  "second_surname": "Pal",
                  "email": "pedro@example.com"
                },
                "date": "2018-12-22T04:00:00.000Z",
                "amount": 12.3
            }
           ]
        }
    ```
    
     >`GET` | `PUT` api/transactions/1
  
    ```json
    {
        "status": "success",
        "data": {
            "id": 1,
            "customer": {
                "id": 4,
                "first_name": "Pedro",
                "second_name": "Pablo",
                "first_surname": "Pérez",
                "second_surname": "Pal",
                "email": "pedro@example.com"
            },
            "date": "2018-12-22T04:00:00.000Z",
            "amount": 10.3
        }
    }
    ```
    
    >`DELETE` api/transactions/1
      
     ```json
     {
         "status": "success",
         "message": "Removed 1 transaction"
     }
     ```
    
    >`POST` api/transactions
      
     ```json
     {
         "status": "success",
         "data": {
             "id": 1,
             "customer": {
                 "id": 1,
                 "first_name": "Pedro",
                 "second_name": "Pablo",
                 "first_surname": "Pérez",
                 "second_surname": "Pal",
                 "email": "pedro@example.com"
             },
             "date": "2018-12-22T04:00:00.000Z",
             "amount": 2
         }
     }
     ```
 
* **Respuesta errónea:**

  >`GET` | `PUT` | `DELETE` api/transactions/1000

  ```json
       {
           "status": "error",
           "message": "There is not transaction with the given ID"
       }
  ```
        
  >`GET` | `PUT` | `DELETE` api/transactions/A

  ```json
    {
        "status": "error",
        "message": {
            "status": 404
        }
    }
  ```
  
  >`POST` api/transactions
  
  ```json
      {
          "status": "error",
          "message": "Property '{property missing}' doesn't exist."
      }
  ```
  
  >`POST` api/transactions | `PUT` api/transactions/{id}
  
  ```json
        {
            "status": "error",
            "message": "There is not costumer with the given ID"
        }
    ```