package io.github.eletropronto.demo.validator;
import io.github.eletropronto.demo.model.Address;
import io.github.eletropronto.demo.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AddressValidator {

    @Autowired
    private AddressRepository repository;

    public AddressValidator(AddressRepository repository){
        this.repository = repository;
    }

    public void validate(Address address) {
        if(existsAddress(address)){
            throw new IllegalArgumentException("Duplicated entry address");
        }
    }
    private boolean existsAddress(Address address){
        Optional<Address> foundedAddress = repository.findAddressByCodeAndStateAndCityAndNumber(
                 address.getCode(), address.getState(), address.getCity(), address.getNumber()
        );
        if(address.getId() == null){
            return foundedAddress.isPresent();
        }
        return !address.getId().equals(foundedAddress.get().getId()) && foundedAddress.isPresent();
    }
}
