package com.example.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Role {

    public Role(String name) {
        this.name = name;
    }

    @Id @GeneratedValue
    private Long id;

    private String name;

}
