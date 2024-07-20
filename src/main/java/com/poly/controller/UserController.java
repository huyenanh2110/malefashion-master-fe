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
}
