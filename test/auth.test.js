const axios = require('axios');
const authHeader = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkZXNjbzI4IiwidXNlcklkIjoiNjU1NTRjNjg4ZWU2ZDI5YmUzODUzZDhkIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAwMDkwNTIzfQ.VXpb27PClynD9JdnU52tN_D_dpXPUAmmBrhLXvpviiU";
// jest.setTimeout(100000);

test("Test to see how the register and login works", async () => {
    const response =  await axios.post("http://localhost:4000/user/register", {
        username: "myName",
        email: "yourmailhere",
        role: "admin",
        password: "myPass1",
       
    });
    expect(response.status).toBe(201);
     expect(response.data).toBe("Created Successfully");
});



test("Test to check for login", async ()  => {
    const response = await axios.post("http://localhost:4000/user/login", {
        email:  "yourmailhere",
        password: "LONGITUDINALiism"
    });
    expect(response.status).toBe(200);
    expect( (response.data.message)).toBe("Sign in Successful");

});



// const chaiHttp = require('chai-http');
// const { expect }  = 'chai';
// const app = require('../index.js');
// const chai = require('chai');
// chai.use(chaiHttp);

// describe('test to check for authentication', () => {
//   let token;
//     before((done) => {
//         // Perform login or obtain a valid token before running tests
//         chai
//           .request(app)
//           .post('/user/register') // replace with your actual login endpoint
//           .send({
//             username: 'testUser',
//             email: 'olaide34@gmail.com',
//             role: "admin",
//             password: 'newpassword',
//           })
//           .end((err, res) => {
//             // token = res.body.token; // assuming your token is returned in the response
//             done();
//           });
//       });
    
//       it('should return a status code of 201 if created', 
//       chai
//       .request(app)
//       .post('/user/login')
//       .end((err, res) =>{
//         expect(res).to.have.status(201).message("Sign in Successful");
//         done();
//       })
//       )
//     //   it('should return 401 for protected route without authentication', (done) => {
//     //     chai
//     //       .request(app)
//     //       .get('/api/protected') // replace with your actual protected endpoint
//     //       .end((err, res) => {
//     //         expect(res).to.have.status(401);
//     //         done();
//     //       });
//     //   });
    
//     //   it('should return 200 for protected route with authentication', (done) => {
//     //     chai
//     //       .request(app)
//     //       .get('/api/protected') // replace with your actual protected endpoint
//     //       .set('Authorization', `Bearer ${token}`)
//     //       .end((err, res) => {
//     //         expect(res).to.have.status(200);
//     //         done();
//     //       });
//     //   });
    
      
// })
