import styled from 'styled-components';

export const LoginWrapper = styled.div`
  z-index: 0;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 56px;
  background-color: #eee;
`;

export const LoginBox = styled.div`
  width: 400px;
  height: 240px;
  margin: 100px auto;
  background: #fff;
  border-radius: 5px;
  padding-top: 15px;
  box-shadow: 0 0 8px rgba(0,0,0,.1);
`;

export const Input = styled.input`
  display: block;
  width: 200px;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  margin: 30px auto;
  border: 1px solid #ccc;
  border-radius: 2px;
  font-size: 14px;
  background: #fff;
  &::placeholder{
    color: #999;
  }
`;


export const Button = styled.div`
  display: block;
  cursor: pointer;
  width: 240px;
  height: 35px;
  line-height: 35px;
  background: #3194d0;
  border-radius: 15px;
  margin: 30px auto;
  color: #fff;
  text-align: center;
`;