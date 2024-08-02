package com.poly.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/malefashion-master")
public class UserController {

    @GetMapping("/home")
    public String getHome() {
        return "users/index";
    }

    @GetMapping("/shop")
    public String getShop() {
        return "users/shop";
    }

    @GetMapping("/shop-detail")
    public String getShopDetails() {
        return "users/shop-details";
    }

    @GetMapping("/about")
    public String about() {
        return "users/about";
    }

    @GetMapping("/shopping-cart")
    public String shoppingCart() {
        return "users/shopping-cart";
    }

    @GetMapping("/blog")
    public String blog() {
        return "users/blog";
    }

    @GetMapping("/contact")
    public String contact() {
        return "users/contact";
    }
    @GetMapping("/checkout")
    public String checkout() {
        return "users/checkout";
    }




}
