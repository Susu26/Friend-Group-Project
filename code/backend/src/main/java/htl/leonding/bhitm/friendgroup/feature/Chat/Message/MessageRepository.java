package htl.leonding.bhitm.friendgroup.feature.Chat.Message;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MessageRepository implements PanacheRepository<Message> {

}