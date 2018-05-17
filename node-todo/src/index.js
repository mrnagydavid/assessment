import express from 'express';
import server from './app';

server(express()).listen(3000, () => console.log('Example app listening on port 3000!'));