using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Presentation.Hubs
{
    public class NotificationHub : Hub
    {
        public async Task Notify(string user, string message)
        {
            await Clients.All.SendAsync(nameof(SignalREvents.RecieveNotification), user, message);
        }
    }

    public enum SignalREvents
    {
        RecieveNotification
    }
}
