# Rannlab

This project is a student registration and file upload application.

## Getting Started


### Installing

Before you can run the application, you must first install all of the dependencies. Run the following command in the project directory:

```
npm i
```

### Configuration

You must provide the following configuration values in a `.env` file in the root of the project directory:

```
PORT=<port>
MONGO_URL=<mongo_url>
SECRET=<secret>
accessKeyId=<access_key_id>
secretAccessKey=<secret_access_key>
region=<region>
```

### Testing

You can test the API endpoints using the Postman collection in the `postman` directory.

### Endpoints

#### Student Register

Endpoint: `http://localhost:3333/api/v1/register`


Input fields:

- FirstName
- LastName
- SchoolName
- Email
- Mobile
- Password
- PhotoOfTheStudents

##### Response

```
{
    "status": true,
    "message": "Student Registered SuccessFully",
    "data": {
        "FirstName": "Naresh",
        "LastName": "Gohil",
        "SchoolName": "SSG-Una",
        "Email": "naresh12@gmail.com",
        "Mobile": "8989099456",
        "Password": "$2b$10$/y2BWDgmgY/w0PM7fIdGXeflY0/8Ms/me3l4LXGs0bkxtcL9ab3Da",
        "PhotoOfTheStudents": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/StudentData/12.png",
        "_id": "64473ed46faf01446749648d",
        "__v": 0
    }
}
```

#### Login

Endpoint: `http://localhost:3333/api/v1/login`

Input fields:

- UserName
- Password

##### Response

```
{
    "status": true,
    "message": "Student Login SuccessFully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDQ3NDM1YmJmODJkYTViOTNiMzYyMmEiLCJpYXQiOjE2ODIzOTE5NTQsImV4cCI6MTY4MjM5MjAxNH0.59qkFKiANxD3GyEhAMEB_mJVG8wi98LUDr7M368UkZE"
}
```

#### File Upload

Endpoint: `http://localhost:3333/api/v1/file-upload`

Input fields:

- file

##### Response

```
{
    "status": true,
    "message": "File Upload SuccessFully",
    "data": {
        "File": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/StudentData/spider-man-wallpaper-whatspaper-15.jpg",
        "_id": "64474437bf82da5b93b3622d",
        "__v": 0
    }
}
```