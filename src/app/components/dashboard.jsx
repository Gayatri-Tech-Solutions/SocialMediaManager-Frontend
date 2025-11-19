import React from 'react'

const Dashboard = () => {
  return (
    <>
    <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon className="w-8 h-8 text-yellow-600" />
                      <span className="text-green-500 text-sm font-semibold">{stat.change}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Create Post Card */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-4">Create New Post</h3>
                  <div className="space-y-4">
                    <textarea 
                      placeholder="What's on your mind?"
                      className="w-full h-32 p-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-600 transition resize-none"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                          <ImageIcon className="w-5 h-5" />
                        </button>
                        <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                          <Calendar className="w-5 h-5" />
                        </button>
                        <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                          <BarChart3 className="w-5 h-5" />
                        </button>
                      </div>
                      <button className="px-6 py-2 bg-yellow-600 text-black font-semibold rounded-lg hover:bg-yellow-500 transition flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Post to All
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
                  <div className="space-y-4">
                    {recentPosts.map((post, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            post.platform === "Twitter" ? "bg-blue-500" :
                            post.platform === "Facebook" ? "bg-blue-600" : "bg-pink-600"
                          }`}>
                            <Send className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{post.content}</p>
                            <p className="text-gray-400 text-xs">{post.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">{post.engagement}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Platform Performance */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-4">Platform Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["Twitter", "Facebook", "Instagram"].map((platform) => (
                    <div key={platform} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg ${
                          platform === "Twitter" ? "bg-blue-500" :
                          platform === "Facebook" ? "bg-blue-600" : "bg-pink-600"
                        }`}>
                          <Send className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold">{platform}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Engagement</span>
                          <span className="text-green-500">+12%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Posts</span>
                          <span>24</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Growth</span>
                          <span className="text-green-500">+347</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
    </>
  )
}

export default Dashboard
