package com.example.backend.api;

import com.example.backend.domain.Product;
import com.example.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductApi {

    private final ProductRepository productRepository;

    @GetMapping
    public List<Product> list() {
        return productRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Product> create(@RequestBody Product product) {
        Product savedProduct = productRepository.save(product);
        URI productURI = URI.create("/products/" + savedProduct.getName());

        return ResponseEntity.created(productURI).body(savedProduct);
    }
}
