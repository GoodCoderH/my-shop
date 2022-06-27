package com.example.backend.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@Table(name = "products")
public class Product {

    @Id @GeneratedValue
    private Long id;

    @Column(nullable = false, length = 128)
    private String name;

    private String url;

    private float price;

}
