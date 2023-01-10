package com.example.backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;



import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;


    @Test
    @DirtiesContext
    @WithMockUser
    void helloMe() throws Exception {
        mockMvc.perform(get("/api/users/me"))
                .andExpect(status().isOk())
                .andExpect(content().string("user"));
    }

    @Test
    @DirtiesContext
    void helloMe_expect_unknownUser() throws Exception {
        mockMvc.perform(get("/api/users/me"))
                .andExpect(status().isOk())
                .andExpect(content().string("unknownUser"));

    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Frank")
    void login() throws Exception {
        mockMvc.perform(post("/api/users/login").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("Frank"));

    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Frank")
    void logout() throws Exception {
        mockMvc.perform(post("/api/users/logout").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string("unknownUser"));

    }

    @Test
    @DirtiesContext
    void register() throws Exception {

        MongoUserDTO mongoUserDTO = new MongoUserDTO("Ulf","123", "abc", List.of("a", "b"));

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(mongoUserDTO);

        mockMvc.perform(post("/api/users/register").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk());


    }
}