/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import {it,describe,expect} from '@jest/globals';
import {fireEvent, render} from '@testing-library/react-native';
import Login from '../src/auth/login';

// Note: test renderer must be required after react-native.

describe("Test For Login Screen",()=>{

    // it("shoud a button with testId=firstId be existed",()=>{

    //     const navigation={navigate:()=>{}}

    //     jest.spyOn(navigation,"navigate")

    //     const LoginPage=render(<Login navigation={navigation}/>)

    //     const submitButtonExists= LoginPage.getByTestId("todoAdd")
        
    //     fireEvent.press(submitButtonExists)

    //     expect(navigation.navigate).toHaveBeenCalledWith("Home")
    // })

    it("check if add an item",()=>{

        const LoginComponent=render(<Login/>)

        const todoTitle="New Test Title"

        const todoInput=LoginComponent.getByTestId("todoInput")
        
        fireEvent.changeText(todoInput,todoTitle)

        const todoButton=LoginComponent.getByTestId('todoAdd')

        fireEvent.press(todoButton)

        const todoItemText=LoginComponent.getByText(todoTitle)

        expect(todoItemText).not.toBeNull()

    })
    
    it("check if add an item without title",()=>{

        const LoginComponent=render(<Login/>)

        const todoButton=LoginComponent.getByTestId('todoAdd')

        fireEvent.press(todoButton)

        const todoItemText=LoginComponent.getByText("At First Type Your Todo")

        expect(todoItemText).not.toBeNull()

    })

    it("check if remove item",()=>{

        const LoginComponent=render(<Login/>)

        const todoTitle="New Test Title"

        const todoInput=LoginComponent.getByTestId("todoInput")
        
        fireEvent.changeText(todoInput,todoTitle)

        const todoButton=LoginComponent.getByTestId('todoAdd')

        fireEvent.press(todoButton)

        const todoItemText=LoginComponent.getByText(todoTitle)

        expect(todoItemText).not.toBeNull()

        const deleteButton=LoginComponent.getByTestId(todoTitle)

        fireEvent.press(deleteButton)

        const LastAddedItem=LoginComponent.queryByText(todoTitle)

        expect(LastAddedItem).toBeNull()

    })

})