import axios from 'axios';
import { GITHUB_API_URL } from 'utils/constants';

export const gitHubClient = axios.create({
  baseURL: GITHUB_API_URL,
});
