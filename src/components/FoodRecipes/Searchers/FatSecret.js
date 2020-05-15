import hmacsha1 from 'hmacsha1';
import {stringify} from 'query-string';
import axios from 'axios';
axios.defaults.adapter = require('axios/lib/adapters/http');

const API_PATH = 'https://platform.fatsecret.com/rest/server.api';
const ACCESS_KEY = '34272aa80f904f7099c06d3ee92a37e6';
const APP_SECRET = 'f5f7cf2d050344178a6155bce32d24c8';
const OAUTH_VERSION = '1.0';
const OAUTH_SIGNATURE_METHOD = 'HMAC-SHA1';

function getOauthParameters() {
    const timestamp = Math.round(new Date().getTime() / 1000);
    return {
      oauth_consumer_key: ACCESS_KEY,
      oauth_nonce: `${timestamp}${Math.floor(Math.random() * 1000)}`,
      oauth_signature_method: OAUTH_SIGNATURE_METHOD,
      oauth_timestamp: timestamp,
      oauth_version: OAUTH_VERSION,
    };
}

function getSignature(queryParams, httpMethod = 'GET') {
    
    const signatureBaseString = [
      httpMethod,
      encodeURIComponent(API_PATH),
      encodeURIComponent(stringify(queryParams)),
    ].join('&');
    const signatureKey = `${APP_SECRET}&`;
    return hmacsha1(signatureKey, signatureBaseString);
  }


function makeApiCall(methodParams, httpMethod = 'GET') {
    const queryParams = {
      ...getOauthParameters(),
      ...methodParams,
      format: 'json',
    };
    queryParams['oauth_signature'] = getSignature(queryParams, httpMethod);

    const response = {
        data: null,
        error: null
    }
    const config = {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      credentials: 'same-origin',
    };

    return axios(`${API_PATH}?${stringify(queryParams)}`)
    .then(res => {
        return response.data = res;
    }).catch(err => {
        return response.error = err;
    })

    return axios({ method: 'get', url: `${API_PATH}?${stringify(queryParams)} `, headers:{ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } })
}

export async function searchFood(query, maxResults = 50) {
    const methodParams = {
      method: 'foods.search',
      max_results: maxResults,
      search_expression: query,
    };
    return await makeApiCall(methodParams);
}

export function getFood(foodId) {
    const methodParams = {
      method: 'food.get',
      food_id: foodId,
    };
    return makeApiCall(methodParams);
}

export async function searchRecipe(query, maxResults = 50) {
    const methodParams = {
      method: 'recipes.search',
      max_results: maxResults,
      search_expression: query,
    };
    return await makeApiCall(methodParams);
}

export function getRecipe(recipeId) {
    const methodParams = {
      method: 'recipe.get',
      recipe_id: recipeId,
    };
    return makeApiCall(methodParams);
}