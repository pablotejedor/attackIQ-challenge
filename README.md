# React 1

## Objective

Write a password change form **(should not use any external library)**

## Requirements

-    Two inputs
     -    New password
     -    New password confirmation
-    Rules
     -    Minimum length of 8
     -    Max length of 32
     -    Must have letters and numbers
-    Errors feedback if one or more rules is not met
-    One clear all fields button
-    One submit button
     -    Should be disabled if the form is not valid

## Extra points

-    If the form inputs are uncontrolled
-    If the new password can't be one of the following:
     -    Password1234
     -    4tt4ck1q
     -    contraseña1

## Hint

This challenge is heavily inspired on [react-hook-form](https://react-hook-form.com/) paradigm, if you never worked with uncontrolled forms you can take a look there to get inspiration

---

# React 2

## Objective

Write a table to manage a list of students that could be added through a form **(you are allowed to use external libraries. IE. mui, rhf, react-table, etc.)**

## Requirements

-    The table should have the following columns
     -    Full name
     -    Identity Document Number
     -    Gender
-    Each row should have the following actions
     -    Remove
     -    Edit
-    A form to add/edit students with the following fields, types and rules
     -    First name (text - required)
     -    Middle name (text - optional)
     -    Last name (text - required)
     -    IDN (number - required - unique)
     -    Gender (select - required)

## Extra points

-    Sortable rows
-    Search field
-    Pagination

---

# Vanilla

## Objective

Have an input text field and a button next to it and let the user type a pokemon name and fetch its information from `https://pokeapi.co/api/v2/pokemon/:name`. After pressing the search button, you should display the information in a card.

## Requirements

-    Should show an error if the pokemon name retrieves no data
-    Should disable the button if the text is empty
-    Should show the pokemon sprite
-    Should show the pokemon name, height, weight, type and ID
-    Use Flex or Grid in the card

## Extra points

-    If you implement a cache to not do the same request more than once
-    If the input is an autocomplete that suggest pokemon names as you type
