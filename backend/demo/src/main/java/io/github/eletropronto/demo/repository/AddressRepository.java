package io.github.eletropronto.demo.repository;
import io.github.eletropronto.demo.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    Optional<Address> getAddressById(Long id);
    Optional<Address> findAddressByCodeAndStateAndCityAndNumber(String code, String state, String city, String number);
}
