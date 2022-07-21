import React from "react";
import * as S from './styled'
import githubLogo from '../../imgs/github.png'
import linkedinLogo from '../../imgs/linkedin.png'
import { Link } from "react-router-dom";
import logo from "../../imgs/logo.png";
const Footer = () =>{
    return(
        <S.Wrapper>
            <S.Division>
                <hr/>
            </S.Division>
            <S.Column1>
                 <a href="https://www.linkedin.com/in/luiz-antônio-lisboa-b17286220/"  target="_blank" ><img src={githubLogo} width="24" /></a>
                 <a href="https://github.com/tony0305a"  target="_blank" ><img src={linkedinLogo} width="24" /></a>
            </S.Column1>
            <S.Line>
                <S.Legal>
                <Link to="/privacypolicy">
                    <button>Privacy Policy</button>
                </Link>
                <Link to="/termsofservice">
                    <button>Terms of service</button>
                </Link>
                </S.Legal>

                <img src={logo} width="40"/>
            </S.Line>
        </S.Wrapper>
    )
}
export default Footer