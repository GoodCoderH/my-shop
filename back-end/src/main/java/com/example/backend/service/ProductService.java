package com.example.backend.service;

import com.example.backend.domain.Product;
import com.example.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Product save(Product product) {
        return productRepository.save(product);
    }

    public Product findByName(String name) {
        return productRepository.findByName(name).get();
    }

    public List<Product> findAll(){
        return productRepository.findAll();
    }
}
