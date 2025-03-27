const axios=require('axios');//import gareko api lai chaine plugin haru ho
import { expect } from '@playwright/test';//validation ko lagi playwright bata
const cookie=require('cookie');

let apiUrl; //variable banako

async function authenticateUser(userName,password, {request}){//asynchronices function with parameter
    const apiUrl = await getApiBaseUrl();//call gareko function(apibase ma rakheko url aauxa)
    const headers = {
        'Content-Type': 'application/json',
    };
    const requestBody={//json structure jastai ho
        email:userName,
        password:password,

    };
    const response=await request.post(`${apiUrl}/users/login`,{ //request.post hamle axios bata deko ho
        data:requestBody,
        headers,
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    const token = responseBody.token;
    return token;
}
async function getApiBaseUrl(){
    apiUrl =process.env.API_BASE_URL;//aru bela different huna sakxa
    if(!apiUrl){
        apiUrl="https://thinking-tester-contact-list.herokuapp.com"
    }
    
    return apiUrl;
}

async function getEntity(accessToken,module,status,{request}){
    const apiUrl=await getApiBaseUrl();
    const headers={
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': "Bearer " + accessToken,
    };
    const response=await request.get(apiUrl+module,{
        headers,
    });
    const statusCode=response.status();
    expect(statusCode).toBe(parseInt(status));
    const responseBody=await response.json();
    if(responseBody && responseBody[0]._id){
        return responseBody[0]._id;
    }else{
        return null;
    }

}
async function createEntity(userData,accessToken,module,{request}) {
    const apiUrl = await getApiBaseUrl();
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': "Bearer " + accessToken,
    };
    const response=await request.post(apiUrl + module, {
        headers,
        data: JSON.stringify(userData),
    });
    const responseBody=await response.json();
    const statusCode = response.status();
    expect(statusCode).toBe(201);//create hune bela status code 201 aauxa
    if(responseBody && responseBody.id){
        return responseBody.id;
    }else{
        return null;
    }
}

async function deleteEntity(accessToken,module,{request}) {
    const apiUrl=await getApiBaseUrl();
    const headers={
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': "Bearer " + accessToken,
    };
    const response=await request.delete(apiUrl+module,{
        headers,
    });
    const statusCode=response.status();
    expect(statusCode).toBe(200);
}

async function validateEntity(accessToken,module,status,{request}) {
    const apiUrl=await getApiBaseUrl();
    const headers={
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization':"Bearer "+ accessToken,
    };
    const response=await request.get(apiUrl+module,{
        headers,
    });
    const statusCode=response.status();
    expect(statusCode).toBe(parseInt(status));
}

module.exports={authenticateUser,getEntity,createEntity,deleteEntity,validateEntity};