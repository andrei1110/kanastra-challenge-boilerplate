import React from 'react';
import styled from 'styled-components';

interface ISnackBarProps {
    message: string | undefined;
    type: "success" | "error";
}

export const SnackBar:React.FC<ISnackBarProps> = ({ message, type = "success" }) => {
    return type === "error" ?(
        <BoxError>
            { message }
        </BoxError>
    ) : (
        <BoxSuccess>
            { message }
        </BoxSuccess>
    );
};

const BoxError = styled.div`
    height: 48px;
    width: 480px;
    background-color: #8E3C4B;
    color: #F2E2E0;
    position: absolute;
    bottom: 8px;
    left: calc(50% - 240px);
    padding-top: 12px;
    text-align: center;
    border-radius: 4px;
    border: solid 1px #93452C;
`;

const BoxSuccess = styled.div`
    height: 48px;
    width: 480px;
    background-color: #699B56;
    color: #034025;
    position: absolute;
    bottom: 8px;
    left: calc(50% - 240px);
    padding-top: 12px;
    text-align: center;
    border-radius: 4px;
    border: solid 1px #00703E;
`;