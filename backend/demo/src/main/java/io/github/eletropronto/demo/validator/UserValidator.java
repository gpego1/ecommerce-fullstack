package io.github.eletropronto.demo.validator;
import io.github.eletropronto.demo.model.User;
import io.github.eletropronto.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserValidator {

    @Autowired
    private UserRepository repository;

    public UserValidator(UserRepository repository){
        this.repository = repository;
    }

    public void validate(User user){
        if(existsUser(user)){
            throw new IllegalArgumentException("Duplicated user entry");
        }
    }
    private boolean existsUser(User user){
        Optional<User> foundedUser = repository.findByUsernameAndPassword(
                user.getUsername(), user.getPassword()
        );
        if(user.getId() == null){
            return foundedUser.isPresent();
        }
        return !user.getId().equals(foundedUser.get().getId()) && foundedUser.isPresent();
    }
}
