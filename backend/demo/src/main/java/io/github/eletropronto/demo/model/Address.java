package io.github.eletropronto.demo.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "address")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "state", length = 30, nullable = false)
    private String state;

    @Column(name = "city", length = 30, nullable = false)
    private String city;

    @Column(name = "number", length = 10, nullable = false)
    private String number;
}
