package io.github.eletropronto.demo.security;
import io.github.eletropronto.demo.model.User;
import io.github.eletropronto.demo.repository.UserRepository;
import io.github.eletropronto.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.core.GrantedAuthorityDefaults;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    @Override
    public Authentication authenticate(Authentication authentication) {
        String login = authentication.getName();
        String password = authentication.getCredentials().toString();

        Optional<User> optionalUser = userRepository.findByUsername(login);

        if(optionalUser.isEmpty()){
            throw new UsernameNotFoundException("The username canot be resolved");
        }

        User foundUser = optionalUser.get();

        String criptPassword = foundUser.getPassword();
        boolean matchingPassword = encoder.matches(password, criptPassword);
        if(matchingPassword){
            return new CustomAuthentication(foundUser);
        }
        throw new UsernameNotFoundException("The username or the password doesnt exists");
    }

    @Bean
    public GrantedAuthorityDefaults grantedAuthorityDefaults(){
        return new GrantedAuthorityDefaults("");
    }

    @Override
    public boolean supports(Class<?> authentication){
        return authentication.isAssignableFrom(UsernamePasswordAuthenticationToken.class);
    }

}
