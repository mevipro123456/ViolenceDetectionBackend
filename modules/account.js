const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'VD',
  password: 'vOphuc20751',
  port: 5432,
})

//For account table

///List all users in table, sort by id
const getUsers = (request, response) => {
    pool.query('SELECT * FROM account ORDER BY account_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

///Find a user using name
const getUserByName = (request, response) => {
  const name = request.params.name;
    pool.query('SELECT * FROM account WHERE name = $1', [name], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

///Find a user using email
const getUserByEmail = (request, response) => {
  const email = request.params.email;
    pool.query('SELECT * FROM account WHERE email = $1', [email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

///Find a user using phone
const getUserByPhone = (request, response) => {
  const phone = request.params.phone;
    pool.query('SELECT * FROM account WHERE phone = $1', [phone], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

///Add a new user
const createUser = (request, response) => {
    const { email, password, role, name, phone, address } = request.body
    
    pool.query('INSERT INTO account (email, password, role, name, phone, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [email, password, role, name, phone, address], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].account_id}`)
    })
  }

///Update an existing user
const updateUser = (request, response) => {
    const account_id = parseInt(request.params.id)
    const { email, password, role, name, phone, address } = request.body
  
    pool.query(
      'UPDATE account SET email = $1, password = $2, role = $3, name = $4, phone = $5, address = $6 WHERE account_id = $7',
      [email, password, role, name, phone, address, account_id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${account_id}`)
      }
    )
  }

///Delete a user (update is_deleted flag to true)
const deleteUser = (request, response) => {
    const account_id = parseInt(request.params.id)
  
    pool.query('UPDATE account SET is_deleted = TRUE WHERE account_id = $1', [account_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Delete flag updated for ID: ${account_id}`)
    })
  }

//For order_service table

///List all order services in table, sort by id
const getOrderServices = (request, response) => {
  pool.query('SELECT * FROM order_service ORDER BY order_service_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

///Add a new order_service
const createOrderService = (request, response) => {
  const { confirmation_date, order_id, service_id, contract_id } = request.body

  pool.query('INSERT INTO order_service (confirmation_date, order_id, service_id, contract_id) VALUES ($1, $2, $3, $4) RETURNING *', [confirmation_date, order_id, service_id, contract_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Service for order created with ID: ${results.rows[0].order_id}`)
  })
}

///Update service order
const updateOrderService = (request, response) => {
  const order_service_id = parseInt(request.params.id)
  const { confirmation_date } = request.body
  pool.query(
    'UPDATE order_service SET confirmation_date = $1 WHERE order_service_id = $2',
    [confirmation_date, order_service_id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Service order prize updated for ID: ${order_service_id}`)
    }
  )
}

///Delete service order (update is_deleted flag to true)
const deleteOrderService = (request, response) => {
  const order_service_id = parseInt(request.params.id)
  pool.query('UPDATE order_service SET is_deleted = TRUE WHERE order_service_id = $1', [order_service_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Delete flag updated for ID: ${order_service_id}`)
  })
}

//For service table

///List all order services in table, sort by id
const getServices = (request, response) => {
  pool.query('SELECT * FROM service ORDER BY service_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

///Find service regisgtered by name
const getServiceByName = (request, response) => {
  const name = request.params.name;
    pool.query('SELECT * FROM service WHERE name = $1', [name], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

///Add a service
const createService = (request, response) => {
  const { name, membership, price, duration, order_service_id } = request.body

  pool.query('INSERT INTO service (name, membership, price, duration, order_service_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, membership, price, duration, order_service_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Service created with ID: ${results.rows[0].service_id}`)
  })
}

///Update service
const updateService = (request, response) => {
  const service_id = parseInt(request.params.id)
  const { name, membership, price, duration } = request.body
  pool.query(
    'UPDATE service SET name = $1, membership = $2, price = $3, duration = $4 WHERE service_id = $5',
    [name, membership, price, duration, service_id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Service updated for ID: ${service_id}`)
    }
  )
}

///Delete service (update is_deleted flag to true)
const deleteService = (request, response) => {
  const service_id = parseInt(request.params.id)
  pool.query('UPDATE service SET is_deleted = TRUE WHERE service_id = $1', [service_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Delete flag updated for ID: ${service_id}`)
  })
}

//For service_camera_list table

///List all camera services in table, sort by id
const getCameraServices = (request, response) => {
  pool.query('SELECT * FROM service_camera_list ORDER BY camera_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

///Add camera service
const createCameraService = (request, response) => {
  const { service_id, quantity } = request.body

  pool.query('INSERT INTO service_camera_list (service_id, quantity) VALUES ($1, $2) RETURNING *', [service_id, quantity], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Service for camera created with ID: ${results.rows[0].camera_id}`)
  })
}

///Update camera service
const updateCameraService = (request, response) => {
  const camera_id = parseInt(request.params.id)
  const { quantity } = request.body
  pool.query(
    'UPDATE service_camera_list SET quantity = $1 WHERE camera_id = $2',
    [quantity, camera_id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Service for camera updated for ID: ${camera_id}`)
    }
  )
}

///Delete camera service (update is_deleted flag to true)
const deleteCameraService = (request, response) => {
  const camera_id = parseInt(request.params.id)
  pool.query('UPDATE service_camera_list SET is_deleted = TRUE WHERE camera_id = $1', [camera_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Delete flag updated for ID: ${camera_id}`)
  })
}

//For camera table

///List all camera  in table, sort by id
const getCamera = (request, response) => {
  pool.query('SELECT * FROM camera ORDER BY camera_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

///Find a camera using name
const getCameraByName = (request, response) => {
  const name = request.params.name;
    pool.query('SELECT * FROM camera WHERE name = $1', [name], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

///Find a camera using name
const getCameraByModule = (request, response) => {
  const module = request.params.module;
    pool.query('SELECT * FROM camera WHERE module = $1', [module], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

///Add new camera
const createCamera = (request, response) => {
  const { name, module, service_id } = request.body

  pool.query('INSERT INTO camera (name, module, service_id) VALUES ($1, $2, $3) RETURNING *', [name, module, service_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Camera add with ID: ${results.rows[0].camera_id}`)
  })
}

///Update camera service
const updateCamera = (request, response) => {
  const camera_id = parseInt(request.params.id)
  const { name, module } = request.body
  pool.query(
    'UPDATE camera SET name = $1, module = $2 WHERE camera_id = $3',
    [name, module, camera_id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Camera updated for ID: ${camera_id}`)
    }
  )
}

///Delete camera (update is_deleted flag to true)
const deleteCamera = (request, response) => {
  const camera_id = parseInt(request.params.id)
  pool.query('UPDATE camera SET is_deleted = TRUE WHERE camera_id = $1', [camera_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Delete flag updated for ID: ${camera_id}`)
  })
}


/// Test
const getTest = (request, response) => {
  ///Ensure there is a range given for the video
    const range = request.headers.range;
    if (!range) {
      response.status(400).send("Requires Range header");
    }
  
    ///Get video stats
    const videoPath = "video/demo1.mp4";
    const videoSize = fs.statSync("video/demo1.mp4").size;
  
    ///Parse Range
    ///Example: "bytes=32324-"
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  
    ///Create headers
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
  };
  
    ///HTTP Status 206 for Partial Content
    response.writeHead(206, headers);
  
    ///create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });
  
    ///Stream the video chunk to the client
    videoStream.pipe(response);
  }


  module.exports = {
    getUsers,
    getUserByName,
    getUserByEmail,
    getUserByPhone,
    createUser,
    updateUser,
    deleteUser,

    getOrderServices,
    createOrderService,
    updateOrderService,
    deleteOrderService,

    getServices,
    getServiceByName,
    createService,
    updateService,
    deleteService,

    getCameraServices,
    createCameraService,
    updateCameraService,
    deleteCameraService,

    getCamera,
    getCameraByName,
    getCameraByModule,
    createCamera,
    updateCamera,
    deleteCamera,

    getTest
  }
  