# node-auth-passport
Following example at https://scotch.io/tutorials/easy-node-authentication-setup-and-local

Main Changes Made
- Updated dependencies
- Added path and static directory
- Updated body-parser in server.js
- Added mongoose promise to fix mongoose mpromise depreciated issue
- Moved port, sessionSecret, and mongourl to /config/app-config.js
- Made to run on localhost
- ejs files were modified, added main.css to /public/css/
- Login failure message made more ambiguious 'Email or Password Incorrect'
- Issue with req.logout - changed to req.session.destroy()
- /app/models/user.js deleted facebook/twitter/google in schema
- Added 404 page and route