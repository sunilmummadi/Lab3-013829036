import { gql } from 'apollo-boost';

const addCustomer = gql`
    mutation AddCustomer($name: String, $email_id: String, $password: String, $address: String, $phone_number: String){
        addCustomer(name: $name, email_id: $email_id, password: $password, address: $address, phone_number: $phone_number){
            message
            status
        }
    }
`;

const addRestaurant = gql`
    mutation AddOwner($name: String, $email_id: String, $password: String, $address: String, $phone_number: String, $res_name: String, $res_cuisine: String, $res_zip_code: String){
        addOwner(name: $name, email_id: $email_id, password: $password, address: $address, phone_number: $phone_number, res_name: $res_name, res_cuisine: $res_cuisine, res_zip_code: $res_zip_code){
            message
            status
        }
    }
`;

const login = gql`
    mutation login($email_id: String, $password: String){
        login(email_id: $email_id, password: $password){
            message
            status
        }
    }
`;

const updateCustomer = gql`
    mutation updateCustomer($name: String, $email_id: String, $password: String, $address: String, $phone_number: String){
        updateCustomer(name: $name, email_id: $email_id, password: $password, address: $address, phone_number: $phone_number){
            message
            status
        }
    }
`;

const updateRestaurant = gql`
    mutation updateOwner($name: String, $email_id: String, $password: String, $address: String, $phone_number: String, $res_name: String, $res_cuisine: String, $res_zip_code: String){
        updateOwner(name: $name, email_id: $email_id, password: $password, address: $address, phone_number: $phone_number, res_name: $res_name, res_cuisine: $res_cuisine, res_zip_code: $res_zip_code){
            message
            status
        }
    }
`;

const addSection = gql`
    mutation addMenuSection($user_id: String, $menu_section_name: String){
        addMenuSection(user_id: $user_id, menu_section_name: $menu_section_name){
            message
            status
        }
    }
`;

const addItem = gql`
    mutation addMenuItem($user_id: String, $menu_section_name: String, $item_name: String, $item_description: String, $item_price: String){
        addMenuItem(user_id: $user_id, menu_section_name: $menu_section_name, item_name: $item_name, item_description: $item_description, item_price: $item_price){
            message
            status
        }
    }
`;

export {addCustomer, addRestaurant, login, updateCustomer, updateRestaurant, addSection, addItem};