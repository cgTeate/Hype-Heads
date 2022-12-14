package git.cgteatejte91.hypeheads.ui.respository.Order;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import git.cgteatejte91.hypeheads.ui.model.Order.Order;

@Repository
public interface OrdersRepository extends MongoRepository<Order, String>{

    // Optional<Order> findById(Order order);
    List<Order> findAllByUsername(String username);
}
